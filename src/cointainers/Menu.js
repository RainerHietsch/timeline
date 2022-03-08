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
                    <Icon name='grid layout' />
                    Science
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default VertMenu;
