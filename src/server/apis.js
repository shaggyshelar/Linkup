module.exports = function (app) {
    app.get('/api/getHolidays', function (req, res) {
        res.json([
            { id: '1111', date: '11/11/1111', title: 'Laxmi Puja', type: 'Fixed' },
            { id: '2222', date: '22/22/1111', title: 'Bhai Duj', type: 'Floating' },
            { id: '3333', date: '33/33/1111', title: 'Christmas', type: 'Fixed' },
            { id: '4444', date: '44/44/1111', title: 'New Year', type: 'Floating' },
        ]);
    });
}