Filtros de excepción: ¿Por qué el filtro atrapa la clase base y no cada error por separado?

Atrapar la clase base captura también todos sus errores derivados. Así un solo filtro centraliza la traducción de errores de dominio a HTTP, en vez de repetir la misma lógica por cada error.

Middleware: ¿Por qué este middleware no podría decidir si un usuario tiene permiso para una ruta?

Se ejecuta antes de que Nest resuelva el método del controlador. Por eso no conoce de forma fiable el handler ni los metadatos de permisos asociados a él. En este proyecto agrega el ID de petición; la autorización corresponde al guard, que sí puede consultar esos metadatos.

Interceptor de logging: ¿Por qué la petición que responde 409 no aparece en ese registro?

El error de dominio lanza una excepción en lugar de producir una respuesta normal. Si el interceptor registra solo emisiones exitosas, no se ejecuta esa parte para el 409; la excepción continúa hasta el filtro. Para registrar errores tendría que observar también el canal de error.

Interceptor del sobre: ¿Por qué este cambio rompe a cualquier cliente que ya estuviera usando la API?

Cambia la forma de las respuestas: por ejemplo, donde antes el cliente recibía una lista, ahora recibe un objeto con data y meta. Los clientes que esperan la forma anterior dejan de encontrar los campos donde los buscan y pueden fallar.

CORS: Si el servidor respondió en los dos casos, ¿quién bloquea y a quién protege?

El servidor puede responder igualmente. El navegador es quien decide si permite que el JavaScript de ese origen lea la respuesta. CORS protege frente a lecturas no autorizadas desde páginas abiertas en el navegador; no reemplaza autenticación y no bloquea por sí solo solicitudes de otros servidores.

Modelo de Usuario: ¿Por qué el campo se llama passwordHash y no password?

passwordHash deja claro que se almacena el resultado de aplicar un hash, no la contraseña original. Evita tratar por accidente una contraseña en texto claro como dato persistible.

AuthService: ¿Por qué los dos errores del inicio de sesión dicen exactamente lo mismo?

Ambos errores de login usan el mismo mensaje para no revelar si el correo existe. Si la API distinguiera “usuario inexistente” de “contraseña incorrecta”, alguien podría enumerar cuentas válidas.

JWT: Si el contenido se puede leer, ¿qué es lo que protege la firma?

La firma no oculta el contenido: los claims se pueden leer. La firma permite verificar que el token fue emitido por quien posee la clave y que sus claims no fueron modificados; cambiar el contenido invalida la firma.

Guards: ¿Por qué es más seguro proteger todo y abrir a mano, que al revés?

Proteger todo por defecto hace que una ruta nueva también requiera autenticación, salvo que se marque explícitamente como pública. Al dejar todo público por defecto, olvidar proteger una sola ruta puede exponer datos sin que sea evidente.

Excepciones HTTP: ¿Cuál es la diferencia entre un 401 y un 403?

401 significa que falta autenticación válida, por ejemplo, no hay token o es inválido. 403 significa que el usuario sí está autenticado, pero no tiene permiso para realizar esa acción.

Inyección de dependencias (Prisma): ¿Cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?

Cero líneas del AuthService tuvieron que cambiar. El servicio depende del contrato UsuarioRepository; se cambia qué implementación se registra en el módulo, de memoria a Prisma, sin acoplar el servicio a la base de datos.

Seguridad y Claims : ¿Por qué es importante tomar al usuario de los claims del token y no de un parámetro de la URL o del cuerpo? Da un ejemplo concreto de qué pasaría si la API confiara en algo como GET /miembros/3/inscripciones o en el miembroId del cuerpo sin compararlo contra el token. Explica qué claim se usa y por qué el cliente no puede falsificarlo.

La identidad debe salir del token verificado, no de un dato que el cliente pueda cambiar libremente. Por ejemplo, si el usuario autenticado tiene miembroId = 7 y la API confía en GET /miembros/3/inscripciones, podría mostrarle las inscripciones del miembro 3. Lo mismo pasaría si acepta un miembroId: 3 en el cuerpo sin compararlo con el token. El servidor debe usar el claim miembroId para determinar al miembro autenticado y rechazar cualquier discrepancia. El cliente puede leer los claims del JWT, pero no puede cambiarlos y conservar una firma válida sin la clave de firma del servidor.