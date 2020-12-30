export default {
    items: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'group',
            icon: 'feather icon-home',
            children: [
                {
                    id: 'blog_view',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                },
            ]
        },
        {
            id: 'blog',
            title: 'Blog',
            type: 'group',
            icon: 'feather icon-ui',
            children: [
                {
                    id: 'blog_view',
                    title: 'Voir le blog',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-box',
                },
                {
                    id: 'blog_view',
                    title: 'Ajouter un article',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-box',
                },
            ]
        },
        {
            id: 'mod',
            title: 'Modération',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'mod-forum',
                    title: 'Modérer le forum',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-file-text'
                }
            ]
        },
    ]
}
