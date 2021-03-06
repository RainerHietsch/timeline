import { useStore } from '../stores/Store';
import { Icon, Menu } from 'semantic-ui-react'

function VertMenu() {
    const [state, actions] = useStore();
    return (
        <div>
            <Menu vertical>
                <Menu.Item>
                    <Icon name='grid layout' />
                    Civic
                    <Menu.Menu>
                        <Menu.Item
                            name='Buildings'
                            active={state.screen === 'civic'}
                            onClick={() => actions.changeScreen('civic')}
                        >
                            Buildings
                        </Menu.Item>
                        {state.finishedTech.includes('mining') &&
                        <Menu.Item
                            name='Mine'
                            active={state.screen === 'mine'}
                            onClick={() => actions.changeScreen('mine')}
                        >
                            Mine
                        </Menu.Item>
                        }
                        {state.finishedTech.includes('tribalculture') &&
                        <Menu.Item
                            name='Leader'
                            active={state.screen === 'leader'}
                            onClick={() => actions.changeScreen('leader')}
                        >
                            Leader
                        </Menu.Item>
                        }
                    </Menu.Menu>
                </Menu.Item>
                {state.finishedTech.includes('manufacturing') &&
                <Menu.Item>
                    <Icon name='wrench' />
                    Production
                    <Menu.Menu>
                        <Menu.Item
                            name='Production'
                            active={state.screen === 'production'}
                            onClick={() => actions.changeScreen('production')}
                        >
                            Crafting
                        </Menu.Item>
                        <Menu.Item
                            name='Market'
                            active={state.screen === 'market'}
                            onClick={() => actions.changeScreen('market')}
                        >
                            Market
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                }
                <Menu.Item
                    name='browse'
                    active={state.screen === 'research'}
                    onClick={() => actions.changeScreen('research')}
                >
                    <Icon name='lightbulb' />
                    Science
                </Menu.Item>
                {state.finishedTech.includes('architecture') &&
                <Menu.Item
                    name='projects'
                    active={state.screen === 'projects'}
                    onClick={() => actions.changeScreen('projects')}
                >
                    <Icon name='lightbulb'/>
                    Epic Projects
                </Menu.Item>
                }
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
