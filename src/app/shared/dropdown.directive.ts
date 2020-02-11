import { Directive, Input, HostListener, ViewChild } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @Input('appDropdown') dropdownMenu;
    public isMenuExpanded: boolean = false;

    @HostListener('click') toggleDropDown(eventData: Event): void {
        if(!this.isMenuExpanded && this.dropdownMenu) {
            this.dropdownMenu.classList.add('show');
            this.isMenuExpanded = true;
        } else {
            this.dropdownMenu.classList.remove('show');
            this.isMenuExpanded = false;
        }
    }
}