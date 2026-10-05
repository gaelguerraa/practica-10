
### Respuestas de la práctica

- **¿Por qué `@prisma/adapter-mariadb` si se usa MySQL?** MariaDB implementa el protocolo de
  conexión de MySQL; el adaptador sirve para ambos motores compatibles. El proveedor y el dialecto
  que Prisma usa para el esquema siguen siendo `mysql`.
- **¿Cambiar `schema.prisma` altera la base antes de migrar?** No. El archivo es solo la
  descripción declarativa hasta ejecutar `prisma migrate dev` (o desplegar una migración).
- **¿Las migraciones son una foto o un historial?** Son un historial ordenado de cambios. Cada
  directorio conserva el SQL necesario para evolucionar desde el estado anterior.
- **¿Por qué `Horario.clase` crea columna y `Clase.horarios` no?** La relación que declara
  `fields: [claseId]` es el lado que posee la llave foránea. `Clase.horarios` solo expresa la
  navegación inversa de uno a muchos y no necesita una columna adicional.
- **¿De dónde sale la relación muchos-a-muchos entre `Miembro` y `Horario`?** Se deriva de
  `Inscripcion`: cada fila enlaza un miembro con un horario. La restricción única
  `(horarioId, miembroId)` evita repetir el mismo vínculo.
