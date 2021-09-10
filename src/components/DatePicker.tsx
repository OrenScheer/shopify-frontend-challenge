/*
THIS CODE FOR A CHAKRA UI DATEPICKER AND ITS ASSOCIATED CSS WAS WRITTEN BY GITHUB USER igoro00
AND IS TAKEN FROM https://gist.github.com/igoro00/99e9d244677ccafbf39667c24b5b35ed
WITH ONLY SLIGHT MODIFICATIONS
 */

import React, { HTMLAttributes } from "react";
import ReactDatePicker from "react-datepicker";
import { useColorMode } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  dateFormat?: string;
}

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  minDate,
  maxDate,
  locale,
  dateFormat,
}: Props & HTMLAttributes<HTMLElement>) => {
  const isLight = useColorMode().colorMode === "light"; //you can check what theme you are using right now however you want
  return (
    // if you don't want to use chakra's colors or you just wwant to use the original ones,
    // set className to "light-theme-original" ↓↓↓↓
    <div className={isLight ? "light-theme" : "dark-theme"}>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        className="react-datapicker__input-text" //input is white by default and there is no already defined class for it so I created a new one
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        dateFormat={dateFormat}
      />
    </div>
  );
};

export default DatePicker;
