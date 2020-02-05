import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import { platform, IOS } from '@vkontakte/vkui';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import { Link } from '@vkontakte/vkui';

const osName = platform();

const Settings = ({ id, go, groupPin, groupGoId, saveSettings, defaultPin}) => {
    const [newGroupPin, setNewGroupPin] = useState(groupPin === defaultPin ? null : groupPin);
    const [newGoId, setNewGoId] = useState(groupGoId);

    // <Input defaultValue={groupPin === defaultPin ? '' : groupPin} onChange={e => setNewGroupPin(e.target.value)} top="Пин" type="text" />
    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}>
                Настройки приложения
            </PanelHeader>
            <Group title="НАСТРОЙКИ">
                <Div>Начни зарабатывать с ГоуПротект. С каждого проданного полиса вы получаете 15%.<br />Посмотреть статистику и вывести денежные средства можно в личном кабинете.<br /><br />
                    Получи данные для настройки и личный кабинет по почте <Link href="mailto:partners@goprotect.ru" target="_blank">partners@goprotect.ru</Link><br />или в WhatsApp: <Link target="_blank" href="https://api.whatsapp.com/send?phone=79111436990&text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9+%D0%B4%D0%B5%D0%BD%D1%8C%2C+%D1%8F+%D0%B1%D1%8B+%D1%85%D0%BE%D1%82%D0%B5%D0%BB+%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C+%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF+%D0%B4%D0%BB%D1%8F+%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F+%D0%92%D0%9A+%D0%93%D0%BE%D1%83%D0%BF%D1%80%D0%BE%D1%82%D0%B5%D0%BA%D1%82">+7 (931) 008-60-38</Link></Div>
            </Group>
            <Group>
            <FormLayout>
                <Input defaultValue={groupGoId} onChange={e => setNewGoId(e.target.value)} top="Идентификатор" type="text" />
                <Div>
                    <Button style={{cursor: 'pointer'}} size="xl" level="primary" onClick={() => {
                        saveSettings(newGroupPin, newGoId);
                    }}>Сохранить</Button>
                </Div>
            </FormLayout>
            </Group>
        </Panel>
    );
};

Settings.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
};

export default Settings;
