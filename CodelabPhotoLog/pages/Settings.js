import React, { useState } from "react";
import { Switch, Text } from "react-native";
import { withContext } from "context-q";

function Settings(props) {
  const [checked, setChecked] = useState(props.context.showDate);
  return (
    <>
      <Text>날짜 표시</Text>
      <Switch value={checked} onValueChange={() => {
        setChecked(!checked);
        props.context.update({
          showDate: !checked,
        });
      }} />
    </>
  );
}

export default withContext(Settings);
