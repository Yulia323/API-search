import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppValidator } from './core/validators/app.validator'
import { AppService } from './core/services/app.services';
import { Url } from './core/interfaces/app.interfaces';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  displayedColumns: string[] = ['ip', 'country', 'city', 'delete'];
  form: FormGroup;
  urls: Url[] = [];
  isFetching = false;

  @ViewChild(MatTable) table!: MatTable<Url>;

  constructor(private fb: FormBuilder, private appValidator: AppValidator, private appService: AppService) {
    this.form = this.fb.group({
      ip: ['']
    })
    this.setValidators();
  }

  setValidators() {
    this.ip.setValidators([this.appValidator.validateInvalidIp(), this.appValidator.validateIsExists(this.urls)])
  }

  addUrl() {
    if (this.ip.invalid) return;
    const ip = this.ip.value;

    this.isFetching = true;
    this.appService.getLocation(ip).subscribe(data => {
      if (!data.success) {
        alert('Данных по IP не найдено');
        return;
      }
      this.urls.push({ip: ip, city: data.city, country: data.country});
      this.table.renderRows();
      this.ip.setValue('');
      this.isFetching = false;
    })
  }

  deleteUrl(ip: any) {
    this.urls = this.urls.filter((url) => url.ip !== ip)
    this.setValidators();
  }

  get ip() {
    return this.form.controls['ip'];
  }
}
