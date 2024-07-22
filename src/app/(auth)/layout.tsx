"use client"
import { Box, Flex, } from "@mantine/core";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import rightImage from '../../../public/assets/images/medic-auth-image.png'
import { useMediaQuery } from "@mantine/hooks";
export default function AuthLayout({ children }: { children: ReactNode }) {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    return <Box display={'flex'} style={{ width: '100%', height: '100vh', }}>
        <Flex justify={'center'} align={'center'} flex={1} style={{ paddingLeft: '1rem', paddingRight: '1rem', backgroundColor: 'var(var(--mantine-color-blue-1))' }}>
            {children}
        </Flex>
        {
            !isSmallDevice && <Flex flex={1} justify={'center'} align={'center'} style={{ backgroundColor: '#339AF0' }}>
                <Image src={rightImage} alt="right-image" width={600} height={400} />
            </Flex>
        }
    </Box >
}