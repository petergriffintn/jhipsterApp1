package io.jhipster.test1.web.rest;

import io.jhipster.test1.JhipsterApp1App;

import io.jhipster.test1.domain.Ee;
import io.jhipster.test1.repository.EeRepository;
import io.jhipster.test1.service.EeService;
import io.jhipster.test1.service.dto.EeDTO;
import io.jhipster.test1.service.mapper.EeMapper;
import io.jhipster.test1.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.jhipster.test1.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EeResource REST controller.
 *
 * @see EeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp1App.class)
public class EeResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private EeRepository eeRepository;

    @Autowired
    private EeMapper eeMapper;

    @Autowired
    private EeService eeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEeMockMvc;

    private Ee ee;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EeResource eeResource = new EeResource(eeService);
        this.restEeMockMvc = MockMvcBuilders.standaloneSetup(eeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ee createEntity(EntityManager em) {
        Ee ee = new Ee()
            .nom(DEFAULT_NOM);
        return ee;
    }

    @Before
    public void initTest() {
        ee = createEntity(em);
    }

    @Test
    @Transactional
    public void createEe() throws Exception {
        int databaseSizeBeforeCreate = eeRepository.findAll().size();

        // Create the Ee
        EeDTO eeDTO = eeMapper.toDto(ee);
        restEeMockMvc.perform(post("/api/ees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eeDTO)))
            .andExpect(status().isCreated());

        // Validate the Ee in the database
        List<Ee> eeList = eeRepository.findAll();
        assertThat(eeList).hasSize(databaseSizeBeforeCreate + 1);
        Ee testEe = eeList.get(eeList.size() - 1);
        assertThat(testEe.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createEeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eeRepository.findAll().size();

        // Create the Ee with an existing ID
        ee.setId(1L);
        EeDTO eeDTO = eeMapper.toDto(ee);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEeMockMvc.perform(post("/api/ees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ee in the database
        List<Ee> eeList = eeRepository.findAll();
        assertThat(eeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = eeRepository.findAll().size();
        // set the field null
        ee.setNom(null);

        // Create the Ee, which fails.
        EeDTO eeDTO = eeMapper.toDto(ee);

        restEeMockMvc.perform(post("/api/ees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eeDTO)))
            .andExpect(status().isBadRequest());

        List<Ee> eeList = eeRepository.findAll();
        assertThat(eeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEes() throws Exception {
        // Initialize the database
        eeRepository.saveAndFlush(ee);

        // Get all the eeList
        restEeMockMvc.perform(get("/api/ees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ee.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }

    @Test
    @Transactional
    public void getEe() throws Exception {
        // Initialize the database
        eeRepository.saveAndFlush(ee);

        // Get the ee
        restEeMockMvc.perform(get("/api/ees/{id}", ee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ee.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEe() throws Exception {
        // Get the ee
        restEeMockMvc.perform(get("/api/ees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEe() throws Exception {
        // Initialize the database
        eeRepository.saveAndFlush(ee);
        int databaseSizeBeforeUpdate = eeRepository.findAll().size();

        // Update the ee
        Ee updatedEe = eeRepository.findOne(ee.getId());
        // Disconnect from session so that the updates on updatedEe are not directly saved in db
        em.detach(updatedEe);
        updatedEe
            .nom(UPDATED_NOM);
        EeDTO eeDTO = eeMapper.toDto(updatedEe);

        restEeMockMvc.perform(put("/api/ees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eeDTO)))
            .andExpect(status().isOk());

        // Validate the Ee in the database
        List<Ee> eeList = eeRepository.findAll();
        assertThat(eeList).hasSize(databaseSizeBeforeUpdate);
        Ee testEe = eeList.get(eeList.size() - 1);
        assertThat(testEe.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingEe() throws Exception {
        int databaseSizeBeforeUpdate = eeRepository.findAll().size();

        // Create the Ee
        EeDTO eeDTO = eeMapper.toDto(ee);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEeMockMvc.perform(put("/api/ees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eeDTO)))
            .andExpect(status().isCreated());

        // Validate the Ee in the database
        List<Ee> eeList = eeRepository.findAll();
        assertThat(eeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEe() throws Exception {
        // Initialize the database
        eeRepository.saveAndFlush(ee);
        int databaseSizeBeforeDelete = eeRepository.findAll().size();

        // Get the ee
        restEeMockMvc.perform(delete("/api/ees/{id}", ee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ee> eeList = eeRepository.findAll();
        assertThat(eeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ee.class);
        Ee ee1 = new Ee();
        ee1.setId(1L);
        Ee ee2 = new Ee();
        ee2.setId(ee1.getId());
        assertThat(ee1).isEqualTo(ee2);
        ee2.setId(2L);
        assertThat(ee1).isNotEqualTo(ee2);
        ee1.setId(null);
        assertThat(ee1).isNotEqualTo(ee2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EeDTO.class);
        EeDTO eeDTO1 = new EeDTO();
        eeDTO1.setId(1L);
        EeDTO eeDTO2 = new EeDTO();
        assertThat(eeDTO1).isNotEqualTo(eeDTO2);
        eeDTO2.setId(eeDTO1.getId());
        assertThat(eeDTO1).isEqualTo(eeDTO2);
        eeDTO2.setId(2L);
        assertThat(eeDTO1).isNotEqualTo(eeDTO2);
        eeDTO1.setId(null);
        assertThat(eeDTO1).isNotEqualTo(eeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(eeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(eeMapper.fromId(null)).isNull();
    }
}
