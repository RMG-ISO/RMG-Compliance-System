import { ListResultDto } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlService } from '@proxy/controls';
import { ControlDto } from '@proxy/controls/dtos';
import { PrincipleService } from '@proxy/documents';
import { BehaviorSubject, Observable, Subject, catchError, concat, distinctUntilChanged, finalize, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-principles',
  templateUrl: './add-principles.component.html',
  styleUrls: ['./add-principles.component.scss'],
  host: { class:'app-dialog' },
})
export class AddPrinciplesComponent {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;
  @Input('documentId') documentId;

  constructor(
    private principleService: PrincipleService,
    private toasterService:ToasterService,
    private controlService:ControlService

  ) {

  }

  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      controls: new FormControl(null, Validators.required),
      documentId: new FormControl(this.documentId, Validators.required),
      id: new FormControl(null),
    })

    if (this.data) this.form.patchValue(this.data);
    this.loadControls();
  }

  isSaving = false;
  save() {
    console.log(this.form)
    if (this.form.invalid) return;
    this.isSaving = true;
    const request = this.data?.id
      ? this.principleService.update(this.data.id, this.form.getRawValue())
      : this.principleService.create(this.form.getRawValue());

    request
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.ref.close(res);
    });
  }

  // getControls() {
  //   this.controlService.getListWithoutPaging({search:search} as any).subscribe(r => {
  //     console.log(r);
  //   })
  // }



  controls$: Observable<ControlDto[]>;
  controlsInput$ = new Subject<string>();
  selectedPersons: ControlDto[] = [];

  trackByFn(item: ControlDto) {
    return item.id;
  }

  controlsLoading  = false;
  searchTerm;
  searchTermMinLength = 2;
  controlsRes = [];
  private loadControls() {
    // this.controls$ = concat(
    //   of([]), // default items
    //   this.controlsInput$.pipe(
    //     distinctUntilChanged(),
    //     tap((term) => {
    //       this.controlsLoading = true;
    //       console.log('term ', term)
    //     }),
    //     switchMap(term => !term || !term.length  ? new BehaviorSubject([]) : this.controlService.getListWithoutPaging({search:term} as any).pipe(
    //       catchError(() => of([])), // empty list on error
    //       tap(() => this.controlsLoading = false),
    //       map( (res:ListResultDto<ControlDto>) => res.items)
    //     ))
    //   )
    // );


    this.controls$ = concat(
      of([]), // default items
      this.controlsInput$.pipe(
        distinctUntilChanged(),
        switchMap((term) => {
          console.log('term', term)
          if(!term || (term.length < this.searchTermMinLength)){
            return of(this.controlsRes);
          }
          this.controlsLoading = true
          return this.controlService.getListWithoutPaging({search:term} as any).pipe(
            catchError(() => {
              this.controlsRes = [];
              return of([])
            }), // empty list on error
            tap(() => (this.controlsLoading = false)),
            map( (res:ListResultDto<ControlDto>) => {
              this.controlsRes = res.items
              return res.items
            })
          )
        }

        )
      )
    );

  }



}
