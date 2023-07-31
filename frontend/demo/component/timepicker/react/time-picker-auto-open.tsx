const Example = () => (
  <>
    {/* tag::snippet[] */}
    <TimePicker label="Alarm" value="05:30" step={60 * 30} autoOpenDisabled />
    {/* end::snippet[] */}
  </>
);

export default reactExample(Example);
