import { useForm } from '@hilla/react-form';

import { OfficeService } from 'Frontend/generated/endpoints';
import CompanyOfficeModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/CompanyOfficeModel';
import { useEffect, useState } from 'react';
import Country from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/Country';
import City from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/City';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import { Button } from '@hilla/react-components/Button.js';

export default function CompanyOfficeView() {
  // tag::snippet[]
  const form = useForm(CompanyOfficeModel, {
    onSubmit: async (companyOffice) => {
      await OfficeService.saveCompanyOffice(companyOffice);
    },
  });
  const [countries, setCountries] = useState(Array<Country>());
  const [cities, setCities] = useState(Array<City>());

  useEffect(() => {
    OfficeService.loadCompanyOffice().then(form.read);
    OfficeService.loadCountries().then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    if (form.value.country && form.value.country.name) {
      OfficeService.loadCities(form.value.country.name).then((cities) => {
        setCities(cities);
        form.value.city = cities[0];
      });
    }
  }, [form.value.country]);

  return (
    <section>
      <ComboBox
        {...form.field(form.model.country)}
        label={'Country'}
        items={countries}
        itemLabelPath={'name'}
        itemValuePath={'name'}
      />
      <ComboBox
        {...form.field(form.model.city)}
        label={'City'}
        items={cities}
        itemLabelPath={'name'}
        itemValuePath={'name'}
      />
      <Button onClick={form.submit}>Save</Button>
    </section>
  );
  // end::snippet[]
}
