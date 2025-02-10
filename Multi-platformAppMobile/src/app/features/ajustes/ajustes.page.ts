import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: false
})
export class AjustesPage implements OnInit {
  settings = {
    darkMode: false,
    language: 'es',
    currency: 'MXN',
    notifications: {
      email: true,
      push: false,
      promotions: true
    }
  };

  languages: Record<string, string> = {
    es: 'Español',
    en: 'Inglés',
    fr: 'Francés'
  };

  currencies: Record<string, string> = {
    MXN: 'Pesos Mexicanos',
    USD: 'Dólar Americano',
    EUR: 'Euro'
  };

  constructor() {}

  ngOnInit() {}

  toggleDarkMode() {
    this.settings.darkMode = !this.settings.darkMode;
    console.log('Modo oscuro:', this.settings.darkMode);
  }

  openLanguageSelection() {
    console.log('Abrir selección de idioma');
    // Lógica para abrir un modal o popover
  }

  openCurrencySelection() {
    console.log('Abrir selección de moneda');
    // Lógica para abrir un modal o popover
  }

  getLanguageName(language: string): string {
    return this.languages[language] || 'Desconocido';
  }

  getCurrencyName(currency: string): string {
    return this.currencies[currency] || 'Desconocido';
  }

  toggleNotification(type: 'email' | 'push' | 'promotions') {
    if (this.settings.notifications[type] !== undefined) {
      this.settings.notifications[type] = !this.settings.notifications[type];
      console.log(`Notificación ${type}:`, this.settings.notifications[type]);
    }
  }

  deleteAccount() {
    console.log('Eliminar cuenta');
    // Lógica para eliminar la cuenta
  }
}
