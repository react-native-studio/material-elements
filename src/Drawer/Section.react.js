/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Subheader from '../Subheader';
import Divider from '../Divider';
import ListItem from '../ListItem';
import getTheme from '../styles/getTheme';
import light from '../styles/themes/light';
import merge from 'lodash/merge'

const propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
        label: PropTypes.string,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
    })),
    divider: PropTypes.bool,
};
const defaultProps = {
    title: null,
    items: [],
    divider: false,
    style: {},
};

class Section extends PureComponent {

    _getStyles=()=>{
        let props=this.props;
        const { drawerSection } = getTheme(props.theme);

        return {
            container: [
                drawerSection.container,
                props.style.container,
            ],
            item: [
                drawerSection.item,
                props.style.item,
            ],
            subheader: [
                drawerSection.subheader,
                props.style.subheader,
            ],
            icon: [
                drawerSection.icon,
                props.style.icon,
            ],
            value: [
                drawerSection.value,
                props.style.value,
            ],
            label: [
                drawerSection.label,
                props.style.label,
            ],
        };

    }
    renderTitle = () => {
        const { title } = this.props;

        if (!title) {
            return null;
        }

        return <Subheader text={title} />;
    }
    render() {
        const { items, divider } = this.props;
        const { typography } = merge(light,this.props.theme);

        const styles = this._getStyles();

        return (
            <View>
                <View style={styles.container}>
                    {this.renderTitle(styles)}
                    {items && items.map((item) => {
                        let style = { primaryText: typography.buttons };

                        if (item.active) {
                            style = getTheme(this.props.theme).drawerSectionActiveItem;
                        }

                        return (
                            <ListItem
                                dense
                                key={item.icon}
                                leftElement={item.icon}
                                centerElement={item.value}
                                onPress={item.onPress}
                                style={style}
                            />
                        );
                    })}
                </View>
                {divider && <Divider />}
            </View>
        );
    }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
