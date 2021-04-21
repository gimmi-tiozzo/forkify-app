/**
 * Decorator per permettere autbind di un metodo
 * @param _ target prototipo della fn costruttore o fg costruttore
 * @param _2 key nome metodo
 * @param descriptor descrittore proprietà che referenzia il metodo
 * @returns nuovo descrittore con il bind(this) applicato al metodo
 */
export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
