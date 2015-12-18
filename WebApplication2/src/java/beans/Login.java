/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.io.Serializable;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author syco
 */
@Entity
@Table(name = "login")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Login.findAll", query = "SELECT l FROM Login l"),
    @NamedQuery(name = "Login.findByEntrar", query = "SELECT l FROM Login l WHERE l.user = :user and l.password= :password"),
    @NamedQuery(name = "Login.findByIdLogin", query = "SELECT l FROM Login l WHERE l.idLogin = :idLogin"),
    @NamedQuery(name = "Login.findByUser", query = "SELECT l FROM Login l WHERE l.user = :user"),
    @NamedQuery(name = "Login.findByIdUsuario", query = "SELECT l FROM Login l WHERE l.idUsuario.idUsuario = :idUsuario"),
    @NamedQuery(name = "Login.findByPassword", query = "SELECT l FROM Login l WHERE l.password = :password")})
public class Login implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID_LOGIN")
    private Integer idLogin;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "USER")
    private String user;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "PASSWORD")
    private String password;
    @JoinColumn(name = "ID_USUARIO", referencedColumnName = "ID_USUARIO")
    @ManyToOne(optional = false)
    private Usuario idUsuario;

    public Login() {
    }

    public Login(Integer idLogin) {
        this.idLogin = idLogin;
    }

    public Login(Integer idLogin, String user, String password) {
        this.idLogin = idLogin;
        this.user = user;
        this.password = password;
    }

    public Integer getIdLogin() {
        return idLogin;
    }

    public void setIdLogin(Integer idLogin) {
        this.idLogin = idLogin;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Usuario getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Usuario idUsuario) {
        this.idUsuario = idUsuario;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idLogin != null ? idLogin.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Login)) {
            return false;
        }
        Login other = (Login) object;
        if ((this.idLogin == null && other.idLogin != null) || (this.idLogin != null && !this.idLogin.equals(other.idLogin))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "beans.Login[ idLogin=" + idLogin + " ]";
    }

    public String generarPassword() {
        String key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        String pswd = "";

        for (int i = 0; i < 8; i++) {
            pswd += (key.charAt((int) (Math.random() * key.length())));
        }

        return pswd;
    }

    public void mandaMail(String destinatario, String pass) throws MessagingException {

        //
        Properties props = new Properties();
        // Nombre del host de correo
        props.setProperty("mail.smtp.host", "smtp.gmail.com");//para gmail smtp.gmail.com
        // TLS si está disponible
        //props.setProperty("mail.smtp.starttls.enable", "true");
        props.setProperty("mail.smtp.starttls.enable", "true");
        // Puerto de gmail para envio de correos
        props.setProperty("mail.smtp.port", "587");
        // Nombre del usuario
        props.setProperty("mail.smtp.user", "ajlucea@gmail.com");
        // Si requiere o no usuario y password para conectarse.
        props.setProperty("mail.smtp.auth", "true");
        Session session = Session.getDefaultInstance(props);
        session.setDebug(true);
        MimeMessage message = new MimeMessage(session);
        // Quien envia el correo
        message.setFrom(new InternetAddress("ajlucea@gmail.com"));
        // A quien va dirigido
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(destinatario));
        message.setSubject("asunto");
        String texto = "Bienvenido a EduCom, tus datos de acceso son:";
        texto += "<br/>Usuario : " + destinatario;
        texto += "<br/>Password :" + pass;
        message.setText(texto, "ISO-8859-1", "html");

        Transport t = session.getTransport("smtp");
        t.connect("ajlucea@gmail.com", "kaqucahmamqpfgwq");
//        kaqucahmamqpfgwq
        t.sendMessage(message, message.getAllRecipients());
        t.close();

    }
}
