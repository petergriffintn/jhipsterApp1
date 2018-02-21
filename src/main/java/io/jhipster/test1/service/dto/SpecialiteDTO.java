package io.jhipster.test1.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import io.jhipster.test1.domain.enumeration.TypeSpecialite;

/**
 * A DTO for the Specialite entity.
 */
public class SpecialiteDTO implements Serializable {

    private Long id;

    @NotNull
    private String libelleFr;

    @NotNull
    private String libelleAr;

    private TypeSpecialite type;

    private Long etablissementId;

    private Long parcoursId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleFr() {
        return libelleFr;
    }

    public void setLibelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
    }

    public String getLibelleAr() {
        return libelleAr;
    }

    public void setLibelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
    }

    public TypeSpecialite getType() {
        return type;
    }

    public void setType(TypeSpecialite type) {
        this.type = type;
    }

    public Long getEtablissementId() {
        return etablissementId;
    }

    public void setEtablissementId(Long etablissementId) {
        this.etablissementId = etablissementId;
    }

    public Long getParcoursId() {
        return parcoursId;
    }

    public void setParcoursId(Long parcoursId) {
        this.parcoursId = parcoursId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SpecialiteDTO specialiteDTO = (SpecialiteDTO) o;
        if(specialiteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), specialiteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SpecialiteDTO{" +
            "id=" + getId() +
            ", libelleFr='" + getLibelleFr() + "'" +
            ", libelleAr='" + getLibelleAr() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
