export function getMainMenu() {
    return [
        [
            {
                text: 'Смотрим кинчик на KINOLAND',
                callback_data: 'kinoland'
            }
        ],
        [
            {
                text: 'Смотрим кинчик на HDREZKA',
                callback_data: 'hdrezka'
            }
        ],
        [
            {
                text: 'Двигаемся по городу',
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
                        text: 'Открыть последний ссыль на зеркало',
                        callback_data: 'checkLastReply'
                    }
                ],
                [
                    {
                        text: 'Обновить ссыль на зеркало',
                        callback_data: 'sendReq'
                    }
                ],
                [
                    {
                        text: 'Отправить жалобу в техподдержку',
                        callback_data: 'createTicket'
                    }
                ],
                [
                    {
                        text: 'Вернуться в главное меню',
                        callback_data: 'mainMenu'
                    }
                ],
            ];
        case 'hdrezka' :
            return [
                [
                    {
                        text: 'Открыть последний ссыль на зеркало',
                        callback_data: 'checkLastReply'
                    }
                ],
                [
                    {
                        text: 'Обновить ссыль на зеркало',
                        callback_data: 'sendReq'
                    }
                ],
                [
                    {
                        text: 'Отправить жалобу в техподдержку',
                        callback_data: 'createTicket'
                    }
                ],
                [
                    {
                        text: 'Вернуться в главное меню',
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
                text: 'Спутник (юг)',
                callback_data: 'tel:89501974244'
            }
        ],
        [
            {
                text: 'Регион (юг)',
                callback_data: 'tel:89506556526'
            }
        ],
        [
            {
                text: 'Ямщик (юг)',
                callback_data: 'tel:89043825687'
            }
        ],
        [
            {
                text: 'Максим (юг)',
                callback_data: 'tel:83435041616'
            }
        ],
        [
            {
                text: 'Вояж (север)',
                callback_data: 'tel:83435053335'
            }
        ],
        [
            {
                text: 'Люкс (север)',
                callback_data: 'tel:89122206607'
            }
        ],
        [
            {
                text: 'Регион (север)',
                callback_data: 'tel:89002036253'
            }
        ],
        [
            {
                text: 'Штурман (север)',
                callback_data: 'tel:83435031220'
            }
        ],
        [
            {
                text: 'Вернуться в главное меню',
                callback_data: 'mainMenu'
            }
        ]
    ]
}