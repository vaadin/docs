import { useForm } from '@vaadin/hilla-react-form';

import { OfficeService } from 'Frontend/generated/endpoints';
import CompanyOfficeModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/CompanyOfficeModel';
import { useEffect } from 'react';
import type Country from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/Country';
import type City from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/City';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { Button } from '@vaadin/react-components/Button.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

export default function CompanyOfficeView() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const form = useForm(CompanyOfficeModel, {
    onSubmit: async (companyOffice) => {
      await OfficeService.saveCompanyOffice(companyOffice);
    },
  });
  const countries = useSignal<Country[]>([]);
  const cities = useSignal<City[]>([]);

  useEffect(() => {
    OfficeService.loadCompanyOffice().then(form.read);
    OfficeService.loadCountries().then((loaded) => {
      countries.value = loaded;
    });
  }, []);

  useEffect(() => {
    if (form.value.country?.name) {
      OfficeService.loadCities(form.value.country.name).then((loaded) => {
        cities.value = loaded;
        form.value.city = loaded[0];
      });
    }
  }, [form.value.country]);

  return (
    <section>
      <ComboBox
        {...form.field(form.model.country)}
        label={'Country'}
        items={countries.value}
        itemLabelPath={'name'}
        itemValuePath={'name'}
      />
      <ComboBox
        {...form.field(form.model.city)}
        label={'City'}
        items={cities.value}
        itemLabelPath={'name'}
        itemValuePath={'name'}
      />
      <Button onClick={form.submit}>Save</Button>
    </section>
  );
  // end::snippet[]
}
