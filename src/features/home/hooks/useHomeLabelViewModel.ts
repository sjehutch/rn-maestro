import { useCallback, useMemo } from "react";
import { useHomeLabelStore } from "@shared/state/homeLabelStore";

type HomeLabelViewModel = {
  label: string;
  onChangeLabelPress: () => void;
  onResetLabelPress: () => void;
};

export const useHomeLabelViewModel = (): HomeLabelViewModel => {
  const label = useHomeLabelStore((homeLabelState) => homeLabelState.label);
  const setLabel = useHomeLabelStore((homeLabelState) => homeLabelState.setLabel);
  const resetLabel = useHomeLabelStore((homeLabelState) => homeLabelState.resetLabel);

  const onChangeLabelPress = useCallback(() => {
    const now = new Date();
    setLabel(`Updated at ${now.toLocaleTimeString()}`);
  }, [setLabel]);

  return useMemo(
    () => ({
      label,
      onChangeLabelPress,
      onResetLabelPress: resetLabel,
    }),
    [label, onChangeLabelPress, resetLabel],
  );
};
