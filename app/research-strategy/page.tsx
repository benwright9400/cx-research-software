"use client";

import { usePopup } from "../providers/child-providers/PopupProvider";

export default function ResearchStrategyPage() {
    const popup = usePopup();

    return <div>
        Research strategy
        <button onClick={() => {popup.openPopup(); popup.setTitle("This is a test");}}>
            Open Drawer
        </button>
    </div>;
}