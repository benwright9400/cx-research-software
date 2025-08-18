"use client"

import { createContext, useContext, useState, ReactNode } from "react";

export type PopupContextType = {
    isOpen: boolean;
    title: string;
    openPopup: () => void;
    closePopup: () => void;
    setTitle: (title: string) => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return (<PopupContext.Provider value={{ isOpen, openPopup, closePopup, title, setTitle }}>
        {children}
    </PopupContext.Provider>);
}

export function usePopup() {
    const context = useContext(PopupContext);

    if(!context) {
        throw new Error("PopupProvider not detected; please check it is in a parent component");
    }

    return context;

}