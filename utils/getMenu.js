export function getMainMenu() {
    return [
        [
            {
                text: '🎬  Смотрим кинчик на KINOLAND',
                callback_data: 'kinoland'
            }
        ],
        [
            {
                text: '🎬  Смотрим кинчик на HDREZKA',
                callback_data: 'hdrezka'
            }
        ],
        [
            {
                text: '🚖  Двигаемся по городу',
                callback_data: 'taxi'
            }
        ]
    ]
}

export function getChoiceMenu(choiseOption) {
    switch (choiseOption) {
        case 'kinoland':
            return [
                [
                    {
                        text: '🎥  Открыть последний ссыль на зеркало',
                        callback_data: 'checkLastReply'
                    }
                ],
                [
                    {
                        text: '📲  Обновить ссыль на зеркало',
                        callback_data: 'sendReq'
                    }
                ],
                [
                    {
                        text: '🔖  Отправить жалобу в техподдержку',
                        callback_data: 'createTicket'
                    }
                ],
                [
                    {
                        text: '<-- Вернуться в главное меню',
                        callback_data: 'mainMenu'
                    }
                ],
            ];
        case 'hdrezka' :
            return [
                [
                    {
                        text: '🎥  Открыть последний ссыль на зеркало',
                        callback_data: 'checkLastReply'
                    }
                ],
                [
                    {
                        text: '📲  Обновить ссыль на зеркало',
                        callback_data: 'sendReq'
                    }
                ],
                [
                    {
                        text: '🔖  Отправить жалобу в техподдержку',
                        callback_data: 'createTicket'
                    }
                ],
                [
                    {
                        text: '<-- Вернуться в главное меню',
                        callback_data: 'mainMenu'
                    }
                ],
            ];
        default:
            return null;
    }
}

export function getTaxiMenu() {
    return [
        [
            {
                text: '🚖  Спутник (юг)',
                callback_data: 'tel:89501974244|Спутник (юг)'
            }
        ],
        [
            {
                text: '🚖  Регион (юг)',
                callback_data: 'tel:89506556526|Регион (юг)'
            }
        ],
        [
            {
                text: '🚖  Ямщик (юг)',
                callback_data: 'tel:89043825687|Ямщик (юг)'
            }
        ],
        [
            {
                text: '🚖  Максим (юг)',
                callback_data: 'tel:83435041616|Максим (юг)'
            }
        ],
        [
            {
                text: '🚖  Вояж (север)',
                callback_data: 'tel:83435053335|Вояж (север)'
            }
        ],
        [
            {
                text: '🚖  Люкс (север)',
                callback_data: 'tel:89122206607|Люкс (север)'
            }
        ],
        [
            {
                text: '🚖  Регион (север)',
                callback_data: 'tel:89002036253|Регион (север)'
            }
        ],
        [
            {
                text: '🚖  Штурман (север)',
                callback_data: 'tel:83435031220|Штурман (север)'
            }
        ],
        [
            {
                text: '🏎  Человек Смита -Втакси-',
                callback_data: 'tel:+79022725373|человеку Смита'
            }
        ],
        [
            {
                text: '🚕  Заказ онлайн (tg)',
                callback_data: 'link:https://t.me/polevskoy_taxi'
            }
        ],
        [
            {
                text: '🚕  Заказ онлайн 2 (tg)',
                callback_data: 'link:https://t.me/Polevskoy_Tax'
            }
        ],
        [
            {
                text: '🚕  Заказ онлайн 3 (vk)',
                callback_data: 'link:https://vk.me/join/z45V6aO7t4YiRArHfW7SiRWgr6RDeE_LTG4='
            }
        ],
        [
            {
                text: '<-- Вернуться в главное меню',
                callback_data: 'mainMenu'
            }
        ]
    ]
}

export function getTaxiMenuSouth() {
    return [
        [
            {
                text: '🚖  Спутник (юг)',
                callback_data: 'tel:89501974244|Спутник (юг)'
            }
        ],
        [
            {
                text: '🚖  Регион (юг)',
                callback_data: 'tel:89506556526|Регион (юг)'
            }
        ],
        [
            {
                text: '🚖  Ямщик (юг)',
                callback_data: 'tel:89043825687|Ямщик (юг)'
            }
        ],
        [
            {
                text: '🚖  Максим (юг)',
                callback_data: 'tel:83435041616|Максим (юг)'
            }
        ],
        [
            {
                text: '🏎  Человек Смита -Втакси-',
                callback_data: 'tel:+79022725373|человеку Смита'
            }
        ]
    ]
}