import {createContext} from "react";

export type ContextType = {
    fetchUser: () => Promise<void>;
};

const Context = createContext<ContextType | null>(null);

export default Context;