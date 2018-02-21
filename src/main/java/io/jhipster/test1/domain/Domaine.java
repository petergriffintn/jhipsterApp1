package io.jhipster.test1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Domaine.
 */
@Entity
@Table(name = "domaine")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Domaine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "libelle_fr", nullable = false)
    private String libelleFr;

    @NotNull
    @Column(name = "libelle_ar", nullable = false)
    private String libelleAr;

    @OneToMany(mappedBy = "domaine")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Mention> mentions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleFr() {
        return libelleFr;
    }

    public Domaine libelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
        return this;
    }

    public void setLibelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
    }

    public String getLibelleAr() {
        return libelleAr;
    }

    public Domaine libelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
        return this;
    }

    public void setLibelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
    }

    public Set<Mention> getMentions() {
        return mentions;
    }

    public Domaine mentions(Set<Mention> mentions) {
        this.mentions = mentions;
        return this;
    }

    public Domaine addMention(Mention mention) {
        this.mentions.add(mention);
        mention.setDomaine(this);
        return this;
    }

    public Domaine removeMention(Mention mention) {
        this.mentions.remove(mention);
        mention.setDomaine(null);
        return this;
    }

    public void setMentions(Set<Mention> mentions) {
        this.mentions = mentions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Domaine domaine = (Domaine) o;
        if (domaine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), domaine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Domaine{" +
            "id=" + getId() +
            ", libelleFr='" + getLibelleFr() + "'" +
            ", libelleAr='" + getLibelleAr() + "'" +
            "}";
    }
}
