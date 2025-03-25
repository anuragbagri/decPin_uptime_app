"use client";

import { useAuth } from "@clerk/nextjs";
import {  useEffect, useState } from "react";
import axios from "axios";
import { API_BACKEND } from "@/config";

interface Website{
    id: string;
    url: string;
    ticks: {
        id: string;
        status: string;
        createdAt: string;
        latency: number;
    }[];
}

export function useWebsites(){
    const { getToken } = useAuth();
    const [websites, setWebsites] = useState<Website[]>([]);

    async function refreshWebsites(){
        const token =await getToken();
        const response = await axios.get(`${API_BACKEND}/api/v1/websites`, {
            headers: {
                Authorization: token,
            },
        });
        setWebsites(response.data.websites);
}

    useEffect(()=> {
        refreshWebsites();

        const interval = setInterval(()=> {
            refreshWebsites();
        }, 1000 * 60 * 1);

        return ()=> clearInterval(interval);
},[])
 return {
    websites
 }
}