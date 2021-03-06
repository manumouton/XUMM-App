/* eslint-disable react/jsx-props-no-spreading */
/**
 * TextInput
 *
    <TextInput />
 *
 */
import React, { Component } from 'react';
import { View, TouchableHighlight, TextInput, TextInputProps, ViewStyle, TextStyle } from 'react-native';

import { StringType } from 'xumm-string-decode';
import { Navigator } from '@common/helpers';
import { AppScreens } from '@common/constants';

import { Icon } from '@components';

import { AppColors, AppStyles } from '@theme';
import styles from './styles';

/* Types ==================================================================== */
interface Props extends TextInputProps {
    containerStyle?: ViewStyle;
    activeContainerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    activeInputStyle?: TextStyle;
    showScanner?: boolean;
    scannerType?: StringType;
    onScannerRead?: (decoded: any) => void;
}

interface State {
    focused: boolean;
}

/* Component ==================================================================== */
class Input extends Component<Props, State> {
    instance: TextInput;

    constructor(props: Props) {
        super(props);

        this.state = {
            focused: false,
        };
    }

    public focus = () => {
        this.instance.focus();
    };

    public blur = () => {
        this.instance.blur();
    };

    onFocus = (e: any) => {
        const { onFocus } = this.props;

        this.setState({ focused: true });

        if (onFocus) {
            onFocus(e);
        }
    };

    onBlur = (e: any) => {
        const { onBlur } = this.props;

        this.setState({ focused: false });

        if (onBlur) {
            onBlur(e);
        }
    };

    renderInput = () => {
        const { focused } = this.state;
        const { containerStyle, activeContainerStyle, activeInputStyle, inputStyle, showScanner } = this.props;
        return (
            <View style={[styles.wrapper, containerStyle, focused && activeContainerStyle]}>
                <TextInput
                    ref={r => {
                        this.instance = r;
                    }}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    placeholderTextColor={AppColors.greyDark}
                    autoCapitalize="none"
                    selectionColor={AppColors.black}
                    autoCorrect={false}
                    multiline={false}
                    underlineColorAndroid="transparent"
                    style={[styles.input, { paddingRight: showScanner && 60 }, inputStyle, focused && activeInputStyle]}
                    {...this.props}
                />
            </View>
        );
    };

    showScanner = () => {
        const { onScannerRead, scannerType } = this.props;

        Navigator.showModal(
            AppScreens.Modal.Scan,
            {},
            {
                type: scannerType,
                onRead: onScannerRead,
            },
        );
    };

    render() {
        const { showScanner } = this.props;

        const input = this.renderInput();

        if (showScanner) {
            return (
                <View style={[AppStyles.row]}>
                    {input}
                    <TouchableHighlight style={styles.scanButton} onPress={this.showScanner}>
                        <Icon size={25} name="IconScan" style={styles.scanIcon} />
                    </TouchableHighlight>
                </View>
            );
        }

        return input;
    }
}

/* Export Component ==================================================================== */
export default Input;
