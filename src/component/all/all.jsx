import React, { Component } from 'react'
import { Select, Space } from 'antd';
import axios from 'axios';
import { Cascader } from 'antd';
import { Table, Tag } from 'antd';
import './all.css';


//Rental
const columns_1 = [
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Hotel Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Hotel Description',
    dataIndex: 'des',
    key: 'des',
  },



];
//Weather
const columns = [
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Average humidity',
    dataIndex: 'avghumidity',
    key: 'avghumidity',
  },
  {
    title: 'Average temprature',
    dataIndex: 'avgtemp',
    key: 'avgtemp',
  },
  {
    title: 'Max temperature',
    dataIndex: 'maxtemp',
    key: 'maxtemp',
  },
  {
    title: 'Weather Condition ',
    dataIndex: 'con',
    key: 'con',
  },


];



//Holiday - Country Selector


const options = [
  {
    value: 'CN',
    label: 'China',
    children: [
      {
        value: 'BeiJing',
        label: 'BeiJing',
      },
      {
        value: 'ShangHai',
        label: 'ShangHai',
      },
      {
        value: 'HangZhou',
        label: 'HangZhou',
      },
      {
        value: 'SuZhou',
        label: 'SuZhou',
      },
      {
        value: 'GuangZhou',
        label: 'GuangZhou',
      },
      {
        value: 'NanJing',
        label: 'NanJing',
      },
      {
        value: 'TianJing',
        label: 'TianJing',
      },
      {
        value: 'ChengDu',
        label: 'ChengDu',
      },

    ],
  },
  {
    value: 'JP',
    label: 'Japan',
    children: [
      {
        value: 'Osaka',
        label: 'Osaka',

      },
      {
        value: 'Kyoto',
        label: 'Kyoto',

      },
      {
        value: 'Tokyo',
        label: 'Tokyo',

      },
      {
        value: 'Fukuoka',
        label: 'Fukuoka',

      },
      {
        value: 'Yokohama',
        label: 'Yokohama',

      },
      {
        value: 'Sapporo',
        label: 'Sapporo',

      },
      {
        value: 'Hiroshima',
        label: 'Hiroshima',

      },
      {
        value: 'Nagoya',
        label: 'Nagoya',

      },

    ],
  },
  {
    value: 'US',
    label: 'USA',
    children: [
      {
        value: 'Boston',
        label: 'Boston',
      },
      {
        value: 'Seattle',
        label: 'Seattle',
      },
      {
        value: 'Washington',
        label: 'Washington',
      },
      {
        value: 'Dallas',
        label: 'Dallas',
      },
      {
        value: 'Miami',
        label: 'Miami',
      },
      {
        value: 'Philadelphia',
        label: 'Philadelphia',
      },
      {
        value: 'Houston',
        label: 'Houston',
      },
      {
        value: 'Phoenix',
        label: 'Phoenix',
      },
    ],
  },
  {
    value: 'KR',
    label: 'Korea',
    children: [
      {
        value: 'Seoul',
        label: 'Seoul',
      },
      {
        value: 'Busan',
        label: 'Busan',
      },
      {
        value: 'Gyeongju',
        label: 'Gyeongju',
      },
      {
        value: 'Incheon',
        label: 'Incheon',
      },
      {
        value: 'Jeonju',
        label: 'Jeonju',
      },
      {
        value: 'Daegu',
        label: 'Daegu',
      },
      {
        value: 'Suwon',
        label: 'Suwon',
      },
      {
        value: 'Ulsan',
        label: 'Ulsan',
      },

    ],
  },
];








export default class weather extends Component {

  state = { info: [], city: null, avghumidity: null, avgtemp: null, maxtemp: null, con: "", rental: null, hotel: [] }


  //Holiday
  onChange = async (value) => {
    console.log("Here")
    console.log(value);


    const code = value[0];
    const city = value[1];
    const options = {
      method: 'GET',
      url: 'https://public-holiday.p.rapidapi.com/2023/' + code,
      headers: {

        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '349160849dmsh9b697fc34272351p122c7fjsn6a5662a1d997',
        'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com'

      }


    };


    const data = [];
    await axios.request(options).then(function (response) {
      var info = response.data;
      console.log(response.data);
      for (let i = 0; i < info.length; i++) {
        data.push({

          value: city,
          label: info[i].name
        });
      }

    }).catch(function (error) {
      console.error(error);
    });
    this.setState({ info: data });
    this.setState({ city: city });
  };


  //Selector-Rental and Holiday
  handleChange = async (value) => {
    console.log(`selected ${value}`);
    const city = value;
    const weather_list = [];
    const hotel_list = [];
    //Rental
    const options_1 = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/locations/search',
      params: {
        query: city,
        locale: 'en_US'
      },
      headers: {
        'X-RapidAPI-Key': '597aa96d5bmsh270501d91ddc3a6p144864jsn93f298d6d808',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    };

    await axios.request(options_1).then(function (response) {
      console.log("hotel_1")
      console.log(response.data.suggestions[1].entities);
      for (var i = 0; i < response.data.suggestions[1].entities.length; i++) {
        hotel_list.push(response.data.suggestions[1].entities[i]);
      }

    }).catch(function (error) {
      console.error(error);
    });
    console.log("ht list" + hotel_list)
    this.setState({ hotel: hotel_list })


    //weather
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: {
        q: city,
        days: '1'
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '597aa96d5bmsh270501d91ddc3a6p144864jsn93f298d6d808',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    await axios.request(options).then(function (response) {
      console.log(response.data.forecast.forecastday[0]);
      console.log(response.data.forecast.forecastday[0].day);
      const weather = response.data.forecast.forecastday[0].day
      weather_list.push(weather);
    }).catch(function (error) {
      console.error(error);
    });

    const con_weather = weather_list[0].condition.text;

    this.setState({ avghumidity: weather_list[0].avghumidity, avgtemp: weather_list[0].avgtemp_c, maxtemp: weather_list[0].maxtemp_c, con: con_weather })








  };



  render() {
    const data_hotel = this.state.hotel.map(hotel => {
      return {
        city: this.state.city,
        name: hotel.name,
        des: <span dangerouslySetInnerHTML={{ __html: hotel.caption }} />,
      }
    });
    return (
      <div>
        <div>
          <Cascader options={options} onChange={this.onChange} placeholder="Please select" />
          <Space wrap>
            <Select
              defaultValue="select holiday"
              style={{
                width: 300,
              }}
              onChange={this.handleChange}
              options={this.state.info}
            />

          </Space>
        </div>
        <div><p>Related Weather Information</p></div>
        <div>
          <Table columns={columns} dataSource={[
            {
              city: this.state.city,
              avghumidity: this.state.avghumidity,
              avgtemp: this.state.avgtemp,
              maxtemp: this.state.maxtemp,
              con: this.state.con,

            }


          ]} />
        </div>
        <div><div>
          <p>Related Rental Information</p>
        </div>
          <Table columns={columns_1} dataSource={data_hotel} />


        </div>
      </div>

    )
  }
}
