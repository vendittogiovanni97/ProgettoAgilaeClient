export class ButtonInfo {
  icon: string;
  label: string;
  color: string;
  sortOrder: number;
  constructor({ icon = "", label = "", color = "", sortOrder = 0 } = {}) {
    this.icon = icon;
    this.label = label;
    this.color = color;
    this.sortOrder = sortOrder;
  }
}
