// Esempio di configurazione di un form con campo upload
import React from "react";
import AgilaeForm from "../../../common/components/AgilaeForm";
import { ActionMode } from "../../../common/interfaces/Common";

const MyFormPage = () => {
  // Dati iniziali del form (opzionali)
  const initData = {
    file: [], // Array vuoto per l'upload di file
  };

  const formConfig = {
    action: ActionMode.Edit, // Modalità del form (Edit, Read, Create)
    readPermission: "read_documents", // Permesso per leggere
    editPermission: "edit_documents", // Permesso per modificare
    useCache: true, // Usa la cache
    useSave: true, // Mostra il pulsante di salvataggio

    actionGet: (successCallback: any) => {
      const formData = {
        structure: {
          title: "Form con Upload",
          fields: [
            {
              title: "Documenti",
              isOpen: true,
              type: "fix",
              spacing: 2,
              inputs: [
                {
                  type: "Upload", // Tipo di input: Upload
                  name: "file", // Nome del campo
                  label: "Carica File", // Etichetta mostrata
                  required: true, // Campo obbligatorio
                  max: 3, // Massimo 3 file
                  acceptedTypes: ".pdf,.jpg,.png", // Tipi di file accettati
                  multiple: true, // Consente upload multipli
                  colSize: 12, // Larghezza colonna (12 = full width)
                  readOnly: false, // Non in sola lettura
                },
              ],
            },
          ],
        },
        data: initData || {}, // Usa i dati iniziali o un oggetto vuoto
        editable: true, // Il form è modificabile
        name: "Upload Demo", // Nome del form
        version: "1.0", // Versione
      };
      // Chiamiamo la callback di successo con i dati
      successCallback(formData);
    },

    actionSave: (data: any, successCallback: any, errorCallback: any) => {
      try {
        console.log("Dati da salvare:", data);
        // Qui implementa la logica per salvare i dati, ad esempio una chiamata API

        // Se il salvataggio ha successo, chiama successCallback
        successCallback("Dati salvati con successo!");
      } catch (error: any) {
        // Se c'è un errore, chiama errorCallback
        errorCallback("Errore durante il salvataggio: " + error.message);
      }
    },
  };

  return (
    <div>
      <h1>Demo Form con Upload</h1>
      <AgilaeForm {...formConfig} />
    </div>
  );
};

export default MyFormPage;
