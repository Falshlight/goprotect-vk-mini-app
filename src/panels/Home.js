import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Slider from "@vkontakte/vkui/dist/components/Slider/Slider";
import Input from "@vkontakte/vkui/dist/components/Input/Input";

import fetch from 'axios';
import logo from '../img/logo.png';

import { useState, useEffect } from 'react';

const axios = require('axios');


const Home = ({ id, go, fetchedUser, params, groupPin, groupGoId}) => {
    const [periodValue, setPeriod] = useState('period1');
	const [days, setDays] = useState(1);

    const [sports, setSports] = useState([]);
    const [cost, setCost] = useState(0);
    const [sport, setSport] = useState(0);
    const [award, setAward] = useState(50000);

    const [end, setEnd] = useState(null);

    const type_map = {period1: 10, period2: 30, period3: 20};

    async function getDataAxios() {
    	if (sports.length) return;
        const response =
            await fetch("https://flashlightservice.ml/vkapps/vk-people-protect/api.php?method=sports",
                { headers: {'Content-Type': 'application/json'}}
            );

        var fetchedSports = response.data;
        var ns = fetchedSports['nsSports'];
        ns = ns.sort(function(a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
			return 0});
        var sn = [];
        for (var i = 0; i < ns.length; i++) {
            var s = ns[i];
            sn.push(<option value={s['id']} key={s['id']}>{s['name']}</option>);
        }
        setSports(sn);
    }
    getDataAxios();

	function DaysInput(props) {
		var period = props.period;
		console.log(period);

		if (period === 'period1' && (days <= 30 && days >= 1)) getCost();
		else if (period === 'period2' && (days >= 31 && days <= 90)) getCost();

        return <i style={{display: 'none'}}></i>;

	}

	function getCost() {
		var data = {nsCalc: {adult: 0, type: type_map[periodValue], sports: [parseInt(sport)], award: parseInt(award), duration: days, pin: groupPin, fulltime: 0}};
		console.log(data);
		axios.post('https://flashlightservice.ml/vkapps/vk-people-protect/api.php?method=calc', data)
            .then(function (response) {
                var s = response.data['nsCalcResult']['sum'];
                setCost(s);
            })
            .catch(function (error) {
                console.log(error);
            });
	}

	console.log(periodValue, award, days);

	//

return (
	<Panel id={id}>
		<PanelHeader >GoProtect. Страхование спортсменов для тренировок и соревнований </PanelHeader>
		{params.vk_viewer_group_role === 'admin' && <Div><Button size="xl" level="secondary" onClick={go} data-to="settings" style={{cursor: 'pointer'}}>Настройки приложения</Button></Div> }

		<Group><img className="logo-image" src={logo} alt="GoProtect logo" style={{marginTop: '15px', marginLeft: '15px'}}/>
			<Div style={{color: '#909499'}}>Принимается на всех соревнованиях, подходит для спортивных секций, тренировок, сборов, лагерей. Для взрослых и детей. 200+ видов спорта. Более 200 000 довольных клиентов.</Div>
		</Group>
		<Group>
		<FormLayout>
			<Select top="Выберите вид спорта" placeholder="Не выбрано" onChange={e => setSport(e.target.value)}>
				{sports}
			</Select>
			<Select top="Выберите период" value={periodValue} onChange={e => setPeriod(e.target.value)}>
				<option value="period1">Одно соревнование</option>
				<option value="period2">Сборы</option>
				<option value="period3">Годовой полис</option>
			</Select>

			<Select top="Выберите страховую сумму" value={award} onChange={e => setAward(e.target.value)}>
				<option value="50000">50 000 руб.</option>
				<option value="100000">100 000 руб.</option>
				<option value="200000">200 000 руб.</option>
			</Select>

			{periodValue === 'period1'  && <Input value={days} top="Выберите кол-во дней от 1 до 30" type="number" min={1} max={30} onChange={e => setDays(parseInt(e.target.value)) }/>}
			{periodValue === 'period2' && <Input value={days} top="Выберите кол-во дней от 31 до 90" type="number" min={31} max={90} onChange={e => setDays(parseInt(e.target.value)) }/>}
			<DaysInput period={periodValue} />

			<h2 style={{fontSize: '20px', marginLeft: '15px', marginTop: '0', marginBottom: '0', paddingTop: '0'}}>Стоимость спортивной страховки на одного человека: {cost && (cost).toLocaleString('ru')} руб.</h2>
			<Div>
				{cost > 0 && <Button style={{cursor: 'pointer'}} size="xl" level="primary" stretched onClick={() => {
					var pid = groupGoId ? groupGoId : '';
					var url = "https://www.goprotect.ru/calc?product=1&partnerId="+pid+"&utm_medium=vk_widget&state=2&is_adult=1&orderType="+type_map[periodValue]+"&count_days="+days+"&sport="+sport+"&award="+award;
                    var link = document.createElement('a');
                    link.href = url;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}>Оформить онлайн</Button>}
			</Div>
		</FormLayout>
		</Group>

	</Panel>
)};

export default Home;
