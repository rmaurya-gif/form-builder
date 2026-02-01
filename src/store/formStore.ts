import { create } from 'zustand'

export type FieldType = 'text' | 'textarea' | 'checkbox' | 'radio' | 'date'

export interface FormField {
  id: string
  type: FieldType
  label: string
  required: boolean
  options?: string[] // For checkbox and radio
  defaultDate?: Date | null // For date fields
}

export interface FormStore {
  formName: string
  fields: FormField[]
  setFormName: (name: string) => void
  addField: (type: FieldType) => void
  updateField: (id: string, updates: Partial<FormField>) => void
  removeField: (id: string) => void
  reorderFields: (newFields: FormField[]) => void
  exportForm: () => string
}

export const useFormStore = create<FormStore>((set, get) => ({
  formName: 'Untitled Form',
  fields: [],

  setFormName: (name) => set({ formName: name }),

  addField: (type) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: `New ${type} field`,
      required: false,
      ...(type === 'checkbox' || type === 'radio' ? { options: ['Option 1', 'Option 2'] } : {}),
      ...(type === 'date' ? { defaultDate: null } : {}),
    }
    set((state) => ({ fields: [...state.fields, newField] }))
  },

  updateField: (id, updates) => {
    set((state) => ({
      fields: state.fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      ),
    }))
  },

  removeField: (id) => {
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
    }))
  },

  reorderFields: (newFields) => {
    set({ fields: newFields })
  },

  exportForm: () => {
    const state = get()
    return JSON.stringify({ name: state.formName, fields: state.fields }, null, 2)
  },
}))