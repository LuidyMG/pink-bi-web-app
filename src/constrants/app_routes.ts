export const APP_ROUTES = {
    public: {
        login: '/login',
        register: '/register'
    },
    private: {
        home: '/',
        product: {
            new: '/product/new',
            view: (productId: string) => {
                return `/product/${productId}`;
            },
            edit: (productId: string) => {
                return `/product/edit/${productId}`;
            }
        }
    }
};