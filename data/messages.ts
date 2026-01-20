/**
 * Mock 消息数据
 */

import type { Conversation } from '../types';

/** 消息会话列表 */
export const mockConversations: Conversation[] = [
    {
        id: 'conv-1',
        participantId: 'shelter-2',
        participant: {
            id: 'shelter-2',
            name: '快乐爪爪救助站',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMjMgySDEP8OcmEfL0vs6qML5NYZsyRYy9SmUAd_iwRgEvOlYRokUcDwt-AAdoj5eb36sgG-XZ6q8FMcivrnc7hjvtJN_TndeJKGcyxEdAfcInRzGd-m2GAGiFjQRy4JPjn8soh1B2BpuRQhS5g6Edl7iUUhZcvN8VJW-ZLKncoGvz_Y_7RogLkl2kjxURIks1I3Bxg9Dh5IfCYaW6pPg5K0wPmnc44vF2pf6SaNmNRRBRZqin25j0OV6l9fAmPoLJVFLpzyYChBY',
            type: 'shelter',
        },
        lastMessage: '你好！是的，如果你感兴趣的话，Max 还可以领养！',
        lastMessageTime: '上午 10:30',
        unreadCount: 2,
        online: true,
    },
    {
        id: 'conv-2',
        participantId: 'user-sarah',
        participant: {
            id: 'user-sarah',
            name: 'Sarah（前主人）',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDGB78QcUXZzVxMcxeQ3ag3J09pNLHeNIGwat8RbyfBU1izWb46gRw2xupO7E4ovbCazALbjTqkKbNKniUW0pY762dU4AvGOKPnfmAV8DIAONys8wnHmQASFI49Cw0pbyU50SE9di8SsVnKbHz3phOLzmAoEuQ11pZB7PuEn33busWpsHnHB2Vnga5ic0PbFeLm3BNdzma7tX2mixEUckz1oLc7TAqHcVKQNLw6mXhYhRky9O1BF39x_WApn2c5iMOWqZlMazoSHQ',
            type: 'user',
        },
        lastMessage: '请告诉我你是否需要他的兽医记录。',
        lastMessageTime: '昨天',
        unreadCount: 0,
        online: false,
    },
    {
        id: 'conv-3',
        participantId: 'vet-smith',
        participant: {
            id: 'vet-smith',
            name: 'Smith 医生（兽医）',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1BzsX-Qencz0ME4xpVodu-c9-xee8NlN8GyjT5mPUNsUPgJknFyhUt7KCGQB2dJOhzVDqwyDdvJl9aHBQQKInE7_hlvuIccwqOp_UBPBGRJZYcUBzMORDVCV16AYXdy75uyrykbPUxMCMcFTSnh4xjhqRDqxRqrtU57RpWyV0Mv12I_cUiBwpgSiAUM1uMEgpp3D6JM6ovzPcqDx16ema_bN9JEL5C3xUwuSsifr1pq3A322koLaCEHHMoSxNt-jzoiD5wyfVJ74',
            type: 'vet',
        },
        lastMessage: '疫苗接种时间表已附上。',
        lastMessageTime: '上午 9:15',
        unreadCount: 1,
        online: true,
    },
    {
        id: 'conv-4',
        participantId: 'shelter-city',
        participant: {
            id: 'shelter-city',
            name: '城市动物管理中心',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjvNLhniePTT5VWX5Ura1JEWea2-6XIeWmgpHpyJgqfuZkbIFO86l8DGNy55q7cW3rvTlZN9fbV-4nChBMyXjB3yKisf-U4OzTpoWqPzbwy-az78_cyX9JvjcelXTSLLflwCtiu4VnxAPy5ymUFoKGhHMKLQEpRvY4iTw4WC7D8p3f5ulHR17FLydZbRzaKO8C1EMQroJ6Rb-aEOUK8AVYTAa3hZ2-BbSXVHz9gLvAyNjSfbVYVLYmAxff8rbGKrTzKFHT7UN_pCc',
            type: 'shelter',
        },
        lastMessage: '已收到您的申请。我们会尽快审核。',
        lastMessageTime: '周一',
        unreadCount: 0,
        online: false,
    },
    {
        id: 'conv-5',
        participantId: 'shelter-beagle',
        participant: {
            id: 'shelter-beagle',
            name: '比格犬救援中心',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVAWLhFTiMgEYKjRuaGXJ0_kR1_5UpQB3kVZiLO_MLoDiBXCf2N27rWAekyAAYaXwluRh6qGWjMiTs89tihxVaUvbvBOORzk7tbmP-9L2EZMUQlsfryhADnM5kJpCySHqbL7GlN7YqJdrn1usJllQ6mNLXJVD-YSYMrBIBZlpc0inL9c2wFPArPaLxzp1P_tE82XSMyoHDD1JTgOHzuVAFHIxNQBiEqTIlWjNysNupldilxpy1-WnPUTYeU3D73tDdN_9AjUTjcs4',
            type: 'shelter',
        },
        lastMessage: '感谢您对寄养情况的更新。',
        lastMessageTime: '上周',
        unreadCount: 0,
        online: false,
    },
];

/** 获取总未读消息数 */
export const getTotalUnreadCount = (): number => {
    return mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
};
