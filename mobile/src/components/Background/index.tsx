import React from "react";

import { LinearGradient } from "expo-linear-gradient";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

interface BackgroundProps{
    children?: any, 
}

export function Background({ children }: BackgroundProps){
    const { secundary, secundary85, secundary75} = theme.colors;
    return(
        <LinearGradient
            style={styles.container}
            colors={[secundary, secundary85, secundary75]}
        >
            {children}
        </LinearGradient>
    )
}