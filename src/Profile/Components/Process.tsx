  
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { GetData } from '../../Services/ApiService';
import { Period } from '../../Top/Components/Top';

export const Process = () => {
    const [info, setInfo] = useState < any > ([]);
    useEffect(() => {
        GetData("Planning/Progress/"+Period.Week).then((res) => {
            setInfo(res);
        });
    }, []);
    const data = {
        labels: info.map((item: any) => item.date),
        datasets: [
          {
            label: 'تعداد تست ها',
            data: info.map((item: any) => item.testCount),
            fill: false,
            backgroundColor: '#FD7D21',
            borderColor: '#FD7D21',
            yAxisID: 'y-axis',
          },
          {
            label: 'مجموع زمان مطالعه',
            data: info.map((item: any) => item.studyMinute),
            fill: false,
            backgroundColor: '#0848E5',
            borderColor: '#0848E5',
            yAxisID: 'y-axis',
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: false,
              position: 'right',
              id: 'y-axis',
            },
          
          ],
        },
      };
    return (<Line data={data} options={options} />);
};

