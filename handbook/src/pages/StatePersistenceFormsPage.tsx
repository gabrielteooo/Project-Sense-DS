import forms from '../../content/get-started/state-persistence-forms.json';
import discardModalImg from '../../public/get-started/state-persistence/forms-discard-modal.png';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Get started — State persistence / Forms (Figma 145:16286) */
export function StatePersistenceFormsPage() {
  const { defaultBehaviour, example } = forms;

  return (
    <article className="get-started-page state-persistence-forms-page">
      <HandbookPageHeader title={forms.pageTitle} description={forms.pageDescription} />

      <div className="state-persistence-forms__content">
        <div className="state-persistence-forms__intro">
          <h2 className="colours-overview-section__title">{forms.sectionTitle}</h2>
          <p className="state-persistence-topic__confirmed">{forms.confirmed}</p>
        </div>

        <section className="state-persistence-forms__behaviour" aria-labelledby="forms-default-behaviour">
          <h3 id="forms-default-behaviour" className="state-persistence-forms__subsection-title">
            {defaultBehaviour.title}
          </h3>
          <ol className="state-persistence-forms__list">
            {defaultBehaviour.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <figure className="state-persistence-forms__figure">
          <div className="state-persistence-forms__frame">
            <img
              className="state-persistence-forms__image"
              src={discardModalImg}
              alt={example.alt}
            />
          </div>
        </figure>
      </div>
    </article>
  );
}
