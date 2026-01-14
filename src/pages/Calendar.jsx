// src/pages/Calendar.jsx

import React from 'react';
import { Card, Calendar as AntCalendar } from 'antd';

const Calendar = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
                <p className="text-gray-600 mt-2">View and manage your schedule</p>
            </div>

            <Card>
                <AntCalendar onPanelChange={onPanelChange} />
            </Card>
        </div>
    );
};

export default Calendar;