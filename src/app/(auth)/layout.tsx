"use client"
import { Box, Flex, } from "@mantine/core";
import Image from "next/image";
import { ReactNode } from "react";
import rightImage from '../../../public/assets/images/medic-auth-image.png'
import { useMediaQuery } from "@uidotdev/usehooks";
export default function AuthLayout({ children }: { children: ReactNode }) {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    return <Box display={'flex'} style={{ width: '100%', height: '100vh', gap: 5 }}>
        <Flex justify={'center'} align={'center'} flex={1} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            {children}
        </Flex>
        {!isSmallDevice && <Flex flex={1} justify={'center'} align={'center'} style={{ backgroundColor: '#339AF0' }}>
            <Image src={rightImage} alt="right-image" width={600} height={400} />
        </Flex>}
    </Box>
}