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
import List from "@vkontakte/vkui/dist/components/List/List";


function setSport(h, f, e, sport) {
    h.state.sport = sport;
    f(e);
}

const Sports = ({ id, go, Home}) => (
    <Panel id={id}>
        <PanelHeader>
            Выбор вида спорта
        </PanelHeader>
        <Group>
            <List>
                <Cell
                    onClick={setSport(Home, go, this, 'Россия')}
                    data-to='home'
                >
                    Россия
                </Cell>
                <Cell
                    onClick={setSport(Home, go, this, 'Италия')}
                >
                    Италия
                </Cell>
                <Cell
                    onClick={setSport(Home, go, this, 'Англия')}
                >
                    Англия
                </Cell>
            </List>
        </Group>
    </Panel>
);

Sports.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    sport: PropTypes.string
};

export default Sports;
