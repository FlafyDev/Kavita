import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BookStyle } from '../_models/book-style';

interface Control<T> {
  type: string;
  name: string;
  value: T;
}

class MenuControl implements Control<number> {
  type = 'menu';
  value: number;
  constructor(
    public name: string,
    public options: string[],
    private quickSettings: QuickSettingsComponent
  ) {
    this.value = 0;
  }

  set(newValue: number) {
    this.value = newValue;
    this.quickSettings.updateStyles();
  }
}

class NumberControl implements Control<number> {
  type = 'number';
  display = '';
  value = 0;

  constructor(
    public name: string,
    private increaseAmount: number,
    private quickSettings: QuickSettingsComponent
  ) {}

  set(newValue: number) {
    this.value = newValue;
    this.display = `${newValue}%`;
    this.quickSettings.updateStyles();
  }

  decrease() {
    this.set(this.value - this.increaseAmount);
  }

  increase() {
    this.set(this.value + this.increaseAmount);
  }
}

@Component({
  selector: 'app-quick-settings',
  templateUrl: './quick-settings.component.html',
  styleUrls: ['./quick-settings.component.scss'],
})
export class QuickSettingsComponent implements OnInit {
  @Input() isOpen = false;
  @Input() darkMode = false;
  @Input() user!: User;
  @Input() updateReaderStyles!: (newStyle: BookStyle) => void;
  // @Input() renderer!: Renderer2;

  fontSizeControl = new NumberControl('Font size', 10, this);
  lineHeightControl = new NumberControl('Line Height', 10, this);
  marginControl = new NumberControl('Margin', 10, this);
  fontControl = new MenuControl('Font', ['Arial'], this);

  controls: Control<any>[] = [
    this.fontSizeControl,
    this.lineHeightControl,
    // this.characterSpaceControl,
    this.fontControl,
  ];

  constructor() {}

  ngOnInit(): void {
    this.fontSizeControl.set(this.user.preferences.bookReaderFontSize);
    this.lineHeightControl.set(this.user.preferences.bookReaderLineSpacing);
    this.marginControl.set(this.user.preferences.bookReaderMargin);
  }

  updateStyles() {
    this.updateReaderStyles({
      fontSize: this.fontSizeControl.value,
      lineHeight: this.lineHeightControl.value,
      margin: this.marginControl.value,
    });
  }
}
