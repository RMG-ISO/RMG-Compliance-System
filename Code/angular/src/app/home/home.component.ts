import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  cards = [
    {
      title: 'المستخدمين على النظام',
      count: 100,
      icon: 'metro-users',
      color: '#2B657D',
    },
    {
      title: 'المستخدمين الفعالين',
      count: 10,
      icon: 'user-check',
      color: '#1CAE40',
    },
    {
      title: 'عدد الإدارات',
      count: 5,
      icon: 'network-wired',
      color: '#3B76B1',
    },
    {
      title: 'عدد الإطارات المضافة',
      count: 10,
      icon: 'layer-group',
      color: '#F9CE1A',
    },
    {
      title: 'عدد الإطارات الفعالة',
      count: 7,
      icon: 'layer-group-button',
      color: '#76F094',
    },
    {
      title: 'إطارات طُبق الامتثال عليها',
      count: 10,
      icon: 'layer-group-check',
      color: '#2896E9',
    },
    {
      title: 'عدد المخاطر',
      count: 10,
      icon: 'warning',
      color: '#DF1E39',
    },
    {
      title: 'الأفعال المتخذة على النظام',
      count: 10,
      icon: 'th-list',
      color: '#7467F0',
    },
    {
      title: 'عدد التدقيقات',
      count: 10,
      icon: 'tasks',
      color: '#36D1DC',
    },
  ];

  pieOptions = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily:'ElMessiri, Roboto, Helvetica Neue,  sans-serif'
          },
        },
        data: [
          { value: 1048, name: 'غير ممتثل', itemStyle: { color: '#FE5957' } },
          { value: 735, name: 'ممتثل', itemStyle: { color: '#12A751' } },
          { value: 580, name: 'ممتثل جزئي', itemStyle: { color: '#FAB800' } },
        ],
      },
    ],
  };


  barOption = {
    xAxis: {
      type: 'category',
      data: ['لم تبدأ', 'قيد التنفيذ', 'تمت' , 'متأخرة']
    },
    yAxis: {
      type: 'value'
    },
    barWidth:32,
    series: [
      {
        data: [
          {
           value: 200,
            itemStyle: {
              color: '#8D8D8D',
              borderRadius:4
            }
          },
          {
            value: 200,
            itemStyle: {
              color: '#005CAC',
              borderRadius:4
            }
          },
          {
            value: 200,
            itemStyle: {
              color: '#1CAE40',
              borderRadius:4
            }
          },
          {
            value: 200,
            itemStyle: {
              color: '#FE5957',
              borderRadius:4
            }
          },
        ],
        type: 'bar'
      }
    ]
  };

}


