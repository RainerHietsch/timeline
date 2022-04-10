import { useStore } from '../stores/Store';
import { Icon, Menu } from 'semantic-ui-react'

function VertMenu() {
    const [state, actions] = useStore();
    return (
        <div>
            <Menu vertical>
                <Menu.Item
                    name='browse'
                    active={state.screen === 'civic'}
                    onClick={() => actions.changeScreen('civic')}
                >
                    <Icon name='grid layout' />
                    Civic
                </Menu.Item>
                <Menu.Item
                    name='browse'
                    active={state.screen === 'research'}
                    onClick={() => actions.changeScreen('research')}
                >
                    <Icon name='lightbulb' />
                    Science
                </Menu.Item>
                <Menu.Item
                    name='projects'
                    active={state.screen === 'projects'}
                    onClick={() => actions.changeScreen('projects')}
                >
                    <Icon name='lightbulb' />
                    Epic Projects
                </Menu.Item>
                {state.finishedTech.includes('weapons') &&
                <Menu.Item
                    name='browse'
                    active={state.screen === 'military'}
                    onClick={() => actions.changeScreen('military')}
                >
                    <Icon name='military' />
                    Military
                </Menu.Item>
                }
                {state.finishedTech.includes('scouting') &&
                <Menu.Item
                    name='browse'
                    active={state.screen === 'exploration'}
                    onClick={() => actions.changeScreen('exploration')}
                >
                    <Icon name='compass' />
                    Exploration
                </Menu.Item>
                }
                <Menu.Item
                    name='settings'
                    active={state.screen === 'settings'}
                    onClick={() => actions.changeScreen('settings')}
                >
                    <Icon name='cog' />
                    Settings
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default VertMenu;
