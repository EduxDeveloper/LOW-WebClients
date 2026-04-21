import './Terms.css';

const Terms = () => {
  return (
    <div className="page-container terms-page">
      <h1 className="terms-title">Términos y Condiciones</h1>
      <p className="terms-date">Última actualización: 2 de marzo de 2026</p>
      
      <p className="terms-intro">
        Bienvenido a LØØM & WΞFT. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones. Por favor, léelos cuidadosamente antes de realizar cualquier compra.
      </p>

      <section className="terms-section">
        <h2>1. Información General</h2>
        <p>LØØM & WΞFT es una tienda en línea de ropa y accesorios de estilo urbano. Estos términos y condiciones regirán el uso de nuestro sitio web y la compra de productos.</p>
        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>
      </section>

      <section className="terms-section">
        <h2>2. Registro de Cuenta</h2>
        <ul>
          <li>Debes tener al menos 18 años para crear una cuenta.</li>
          <li>Debes proporcionar información precisa y actualizada.</li>
          <li>Eres responsable de mantener la confidencialidad de tu contraseña.</li>
          <li>No puedes compartir tu cuenta con terceros.</li>
          <li>Nos reservamos el derecho de suspender o cancelar cuentas que violen estos términos.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>3. Productos y Precios</h2>
        <p><strong>Disponibilidad:</strong> Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho de discontinuar cualquier producto en cualquier momento.</p>
        <p><strong>Precios:</strong> Los precios mostrados están en dólares estadounidenses (USD) e incluyen IVA. Nos reservamos el derecho de modificar los precios sin previo aviso.</p>
        <p><strong>Descripciones:</strong> Hacemos todo lo posible por mostrar los colores y detalles con precisión, pero no podemos garantizar que la visualización en tu dispositivo sea exacta.</p>
      </section>

      <section className="terms-section">
        <h2>4. Proceso de Compra</h2>
        <ul>
          <li>Al realizar un pedido, recibirás un email de confirmación.</li>
          <li>La aceptación del pedido está sujeta a disponibilidad.</li>
          <li>Nos reservamos el derecho de rechazar o cancelar cualquier pedido.</li>
          <li>Los pedidos cancelados serán reembolsados en su totalidad.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>5. Métodos de Pago</h2>
        <p>Aceptamos los siguientes métodos de pago:</p>
        <ul>
          <li>Tarjetas de crédito (Visa, Mastercard, American Express)</li>
          <li>Tarjetas de débito</li>
          <li>Efectivo contra entrega (disponible en zonas seleccionadas)</li>
        </ul>
        <p>Todos los pagos son procesados de forma segura. No almacenamos información completa de tarjetas de crédito.</p>
      </section>

      <section className="terms-section">
        <h2>6. Envíos y Entregas</h2>
        <p><strong>Tiempos de entrega:</strong> Los pedidos se procesan en 1-2 días hábiles. El tiempo de entrega es de 3-5 días hábiles adicionales.</p>
        <p><strong>Costo de envío:</strong> Envío gratis en compras superiores a $100.00 USD. Para compras menores, se aplica una tarifa de $5.00 USD.</p>
        <p><strong>Responsabilidad:</strong> No somos responsables por retrasos causados por la empresa de mensajería o circunstancias fuera de nuestro control.</p>
      </section>

      <section className="terms-section">
        <h2>7. Devoluciones y Cambios</h2>
        <p>Aceptamos devoluciones y cambios dentro de los 30 días posteriores a la recepción del producto, siempre que:</p>
        <ul>
          <li>El producto esté sin usar y en su empaque original</li>
          <li>Incluya todas las etiquetas originales</li>
          <li>No presente signos de uso o lavado</li>
          <li>Se presente el comprobante de compra</li>
        </ul>
        <p>Los gastos de envío para devoluciones corren por cuenta del cliente, excepto en casos de productos defectuosos o errores en el pedido.</p>
      </section>

      <section className="terms-section">
        <h2>8. Garantía</h2>
        <p>Todos nuestros productos están garantizados contra defectos de fabricación. Si recibes un producto defectuoso, contáctanos dentro de los 7 días para un reemplazo o reembolso completo.</p>
      </section>

      <section className="terms-section">
        <h2>9. Propiedad Intelectual</h2>
        <p>Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad de LØØM & WΞFT y está protegido por las leyes de derecho de autor. Queda prohibida su reproducción sin autorización.</p>
      </section>

      <section className="terms-section">
        <h2>10. Privacidad</h2>
        <p>El uso de información personal está regulado por nuestra Política de Privacidad. Al usar nuestro sitio web, aceptas la recopilación y uso de información según lo descrito en dicha política.</p>
      </section>

      <section className="terms-section">
        <h2>11. Limitación de Responsabilidad</h2>
        <p>LØØM & WΞFT no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso de nuestros productos o servicios. Nuestra responsabilidad máxima se limitará al precio de compra del producto.</p>
      </section>

      <section className="terms-section">
        <h2>12. Contacto</h2>
        <p>Si tienes preguntas sobre estos términos y condiciones, contáctanos:</p>
        <p>
          <strong>Email:</strong> contacto@loomandweft.com<br/>
          <strong>Teléfono:</strong> +503 2222-3456
        </p>
      </section>

    </div>
  );
};

export default Terms;
