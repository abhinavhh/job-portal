import { useState } from "react";

export const useResetPassword = () => {
    const [reset, setReset] = useState<boolean>(false);
    const toggleReset = () => setReset(prev => !prev);

    return { reset, toggleReset}
}