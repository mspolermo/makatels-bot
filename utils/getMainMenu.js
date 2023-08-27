export function getMainMenu() {
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
    ]
}