import Button from '../Button/Button';
import cls from './Filter.module.css';
import { classNames } from "@/shared/lib/classNames/classNames";

interface FilterProps {
    className?: string;
    title: string;
    tabs: {
        name: string,
        activeStatus: boolean,
        onClick: () => void;
    } []
}

export const Filter = (props : FilterProps) => {
    const { className, title, tabs } = props;
    return (
        <div className={classNames(cls.Filter, {}, [className])}>
            <h2 className={cls.heading}>{title}</h2>
            {tabs.map( (tab, index) => <Button
                    key={index + tab.name}
                    className={classNames(cls.tab, {[cls.active]: tab.activeStatus}, [])}
                    onClick={tab.onClick}
                >
                    {tab.name}
                </Button>)}
        </div>
    );
};