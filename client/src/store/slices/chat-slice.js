export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: {}, // Object keyed by chatId

    setSelectedChatType: (selectedChatType) => {
        set({ selectedChatType });
    },

    setSelectedChatData: (selectedChatData) => {
        set({ selectedChatData });
        console.log("Chat Slice - Selected Chat Data set to:", selectedChatData._id);
    },

    setSelectedChatMessages: (chatId, messages) => {
        set((state) => ({
            selectedChatMessages: {
                ...state.selectedChatMessages,
                [chatId]: messages,
            },
        }));
    },

    addMessageToChat: (chatId, message) => {
        set((state) => ({
            selectedChatMessages: {
                ...state.selectedChatMessages,
                [chatId]: [...(state.selectedChatMessages[chatId] || []), message],
            },
        }));
    },

    closeChat: () => {
        set({
            selectedChatData: undefined,
            selectedChatType: undefined,
            selectedChatMessages: {}, // Clear all chat messages
        });
    },
});