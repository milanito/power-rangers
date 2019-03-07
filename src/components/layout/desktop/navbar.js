import React from 'react'
import {
    Button,
    Container,
    Menu,
} from 'semantic-ui-react'

export default ({ fixed }) => (
    <Menu
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size='large'>
        <Container>
            <Menu.Item as='a' active>
                Home
            </Menu.Item>
            <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item position='right'>
                <Button as='a' inverted={!fixed}>
                    Log in
                </Button>
                <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                </Button>
            </Menu.Item>
        </Container>
    </Menu>
)