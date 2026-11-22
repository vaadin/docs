import { useEffect, useState } from 'react';
import { ValidationError } from '@vaadin/hilla-lit-form';
import { useForm, useFormPart } from '@vaadin/hilla-react-form';
import { Button, ComboBox, VerticalLayout } from '@vaadin/react-components';
import type City from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/City';
import CompanyOfficeModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/CompanyOfficeModel';
import type Country from 'Frontend/generated/com/vaadin/demo/fusion/forms/formchange/Country';
import { OfficeService } from 'Frontend/generated/endpoints';

export default function CompanyOfficeView() {
  // tag::snippet[]
  const { model, field, read, submit, value } = useForm(CompanyOfficeModel, {
    onSubmit: async (companyOffice) => {
      await OfficeService.saveCompanyOffice(companyOffice);
    },
  });
  const city = useFormPart(model.city);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const countryName = value.country.name;

  useEffect(() => {
    OfficeService.loadCompanyOffice().then(read);
    OfficeService.loadCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (!countryName) {
      return;
    }
    OfficeService.loadCities(countryName).then((loaded) => {
      setCities(loaded);
      if (!loaded.some((c) => c.name === city.value?.name)) {
        city.setValue(loaded[0]);
      }
    });
  }, [countryName]);
  // end::snippet[]

  async function save() {
    try {
      await submit();
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        throw error;
      }
    }
  }

  // tag::snippet[]
  return (
    <VerticalLayout theme="padding">
      <ComboBox
        label="Country"
        items={countries}
        itemLabelPath="name"
        itemValuePath="name"
        {...field(model.country)}
      />
      <ComboBox
        label="City"
        items={cities}
        itemLabelPath="name"
        itemValuePath="name"
        {...field(model.city)}
      />
      <Button onClick={save}>Save</Button>
    </VerticalLayout>
  );
  // end::snippet[]
}
